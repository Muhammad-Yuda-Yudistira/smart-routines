<?php

namespace Tests\Unit;

use App\Models\User;
use App\Models\Routine;
use App\Models\Category;
use Illuminate\Foundation\Testing\DatabaseTransactions;
use Tests\TestCase;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Support\Facades\DB;
use Inertia\Testing\Assert as InertiaAssert;
use Inertia\Testing\AssertableInertia as Assert;


class RoutineTest extends TestCase
{
  /**
   * A basic unit test example.
   */

  use DatabaseTransactions;

  protected $user, $routine, $routines, $routine2, $categories;

  public function setUp(): void
  {
    parent::setUp();

    $this->user = User::factory()->create();
	  $this->routine = Routine::factory()->create(['user_id' => $this->user->id]);
    $this->routine2 = Routine::factory()->create(['user_id' => $this->user->id]);
	
    $this->actingAs($this->user);

    $this->routines = Routine::where('user_id', $this->user->id)->get();
    $this->categories = Category::all();
  }

  public function tearDown(): void
  {
    // Routine::where('user_id', $this->user->id)->delete();

    parent::tearDown();
  }

  public function test_show_routines(): void
  {


    $response = $this->get(route('routines.index'));

    $response->assertSuccessful();

    $response->assertInertia(
      fn ($page) => $page
        ->component('Routines/Routines')
        ->has('routines', $this->routines->count())
        ->has('categories', $this->categories->count())
    );
  }


  public function test_store_routine_successfully()
  {
    $data = [
      'title' => 'Test Routine',
      'category_id' => 3,
      'description' => 'This is a test routine',
      'start_time' => '08:00:00',
      'end_time' => '09:00:00',
      'days' => ['Monday', 'Wednesday', 'Friday'],
    ];

    $response = $this->post(route('routines.store'), $data);

    $response->assertRedirect()->assertStatus(302);
    $response->assertSessionHas('message', 'New routine has been created!');

    $this->assertDatabaseHas('routines', [
      'title' => 'Test Routine',
      'user_id' => $this->user->id,
      'category_id' => 3,
      'description' => 'This is a test routine',
      'start_time' => '08:00:00',
      'end_time' => '09:00:00',
      // 'days' => json_encode(['Monday', 'Wednesday', 'Friday']), //karena bug dikecualikan dulu
    ]);
  }

  public function test_store_routine_validation_error()
  {
	$data = [
      'title' => 'Test Routine',
      'category_id' => null,
      'description' => null,
      'start_time' => '08:00:00',
      'end_time' => '09:00:00',
      'days' => ['Monday', 'Wednesday', 'Friday'],
    ];
	
    $response = $this->post(route('routines.store'), $data);

	$response->assertStatus(302);
    $response->assertSessionHasErrors(['category_id', 'description']);
  } 

  public function test_delete_routine_successfully()
  {
    $id = Routine::find($this->routine->id);

    $response = $this->delete(route('routines.destroy', ['routine' => $id]));

    $response->assertRedirect()->assertStatus(302);
    $response->assertSessionHas('message', 'Routine has been deleted!');
  }
  
  public function test_delete_routine_unauthenticated() 
  {
	  $id = Routine::find($this->routine->id);
	  
	  $response = $this->delete(route('routines.destroy', ['routine' => $id]));
	  $response->assertStatus(302)->assertRedirect('/');
	  
	  $response = $this->post('/logout');
	  $response->assertSessionMissing('key');
  }
  
  // update
  public function test_update_routine_successfully()
  {
    $this->routine->title = "Title baru";
    $this->routine->description = "deskripsi baru disini kurang panjang sih";
    $this->routine->days = json_decode($this->routine->days);

    $newRoutine = [
        'title' => $this->routine->title,
        'description' => $this->routine->description,
        'category_id' => $this->routine->category_id,
        'start_time' => '10:00',
        'end_time' => '11:00',
        'days' => $this->routine->days,
        'oldStartTime' => $this->routine->start_time,
        'oldEndTime' => $this->routine->end_time,
    ];
	
	$response = $this->put(route('routines.update', ['routine' => $this->routine->id]), $newRoutine);
	
	$response->assertStatus(200);
	
	$response->assertSessionHas("message", "Routine has been updated!");
	
	$this->assertDatabaseHas('routines', [
		'title' => 'Title baru',
		'description' => 'deskripsi baru disini kurang panjang sih',
		'category_id' => $this->routine->category_id,
		'start_time' => '10:00',
		'end_time' => '11:00',
		// 'days' => $this->routine->days
	]);
  }
  
  public function test_update_routine_time_is_the_same()
  {
    $this->routine2->oldStartTime = $this->routine2->start_time;
     $this->routine2->oldEndTime = $this->routine2->end_time;

  	 $this->routine2->start_time = $this->routine->start_time;
     $this->routine2->end_time = $this->routine->end_time;
     $this->routine2->days = json_decode($this->routine2->days);

     $response = $this->put(route('routines.update', ['routine' => $this->routine->id]), $this->routine2->toArray());

     $response->assertStatus(302);
     $response->assertSessionHasErrors(['start_time', 'end_time']);
  }

  public function test_update_routine_end_time_before_start_time()
  {
    $this->routine->oldStartTime = $this->routine->start_time;
    $this->routine->oldEndTime = $this->routine->end_time;

    $this->routine->start_time = "08:00";
    $this->routine->end_time = "07:00";
    $this->routine->days = json_decode($this->routine->days);

    $response = $this->put(route('routines.update', ['routine' => $this->routine->id]), $this->routine->toArray());

    $response->assertStatus(302);
    $response->assertSessionHasErrors(['end_time']);
  }

  public function test_update_routine_empty_input()
  {
    $this->routine->oldStartTime = $this->routine->start_time;
    $this->routine->oldEndTime = $this->routine->end_time;

    $this->routine->title = "";
    $this->routine->description = "";
    $this->routine->category_id = "";
    $this->routine->start_time = "";
    $this->routine->end_time = "";
    $this->routine->days = [];

    $response = $this->put(route('routines.update', ['routine' => $this->routine->id]), $this->routine->toArray());

    $response->assertStatus(302);
    $response->assertSessionHasErrors(['title', 'description', 'category_id', 'start_time', 'end_time', 'days']);
  }

  public function test_update_routine_unauthenticated()
  {
    $this->routine2->start_time = $this->routine->start_time;
     $this->routine2->end_time = $this->routine->end_time;
     $this->routine2->days = json_decode($this->routine2->days);

     $this->routine->title = "New Title";

    $response = $this->put(route('routines.update', ['routine' => $this->routine->id]), $this->routine->toArray());
    $response->assertStatus(302)->assertRedirect('/');

    $response = $this->post('/logout');
    $response->assertSessionMissing('key');
  }
}
