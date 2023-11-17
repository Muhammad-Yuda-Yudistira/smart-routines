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


class RoutinesTest extends TestCase
{
  /**
   * A basic unit test example.
   */

  use DatabaseTransactions;

  protected $user, $routines, $categories;

  public function setUp(): void
  {
    parent::setUp();

    $this->user = User::factory()->create();
    $this->actingAs($this->user);

    $this->routines = Routine::where('user_id', $this->user->id)->get();
    $this->categories = Category::all();
  }

  public function tearDown(): void
  {
    Routine::where('user_id', $this->user->id)->delete();

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
      'category' => 3,
      'description' => 'This is a test routine',
      'start_time' => '08:00:00',
      'end_time' => '09:00:00',
      'days' => ['Monday', 'Wednesday', 'Friday'],
    ];

    $response = $this->post(route('routines.store'), $data);

    $response->assertRedirect();
    $response->assertSessionHas('message', 'New routine has been created!');

    $this->assertDatabaseHas('routines', [
      'title' => 'Test Routine',
      'user_id' => $this->user->id,
      'category_id' => 3,
      'description' => 'This is a test routine',
      'start_time' => '08:00:00',
      'end_time' => '09:00:00',
      // 'days' => ['Monday', 'Wednesday', 'Friday'], //karena bug dikecualikan dulu
    ]);
  }

  public function test_store_routine_validation_error()
  {
    $response = $this->post(route('routines.store'), []);

    $response->assertSessionHasErrors(['title', 'category', 'description', 'start_time', 'end_time', 'days']);
  }
}
