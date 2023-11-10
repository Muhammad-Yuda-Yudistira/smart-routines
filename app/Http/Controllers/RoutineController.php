<?php

namespace App\Http\Controllers;

use App\Models\Category;
use App\Models\Routine;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Validation\Rule;
use Inertia\Inertia;

class RoutineController extends Controller
{
  /**
   * Display a listing of the resource.
   */
  public function index()
  {
    $routines = Routine::where('user_id', auth()->user()->id)->orderBy('start_time', 'ASC')->with('category')->get();
    $categories = Category::all();
    return Inertia::render('Routines/Routines', [
      'routines' => $routines,
      'categories' => $categories
    ]);
  }

  /**
   * Show the form for creating a new resource.
   */
  public function create()
  {
    //
  }

  /**
   * Store a newly created resource in storage.
   */
  public function store(Request $request)
  {
    $rules = [
      'title' => 'required|string|max:255',
      'category' => 'required',
      'description' => 'required|string',
      'start_time' => ['required', Rule::unique('routines')->where(function ($query) {
        return $query->where('user_id', auth()->user()->id);
      })],
      'end_time' => ['required', Rule::unique('routines')->where(function ($query) {
        return $query->where('user_id', auth()->user()->id);
      })],
      'days' => 'required|array',
    ];

    $request->validate($rules);

    Routine::create([
      "title" => $request->title,
      "category_id" => $request->category,
      "user_id" => auth()->user()->id,
      "description" => $request->description,
      "start_time" => $request->start_time,
      "end_time" => $request->end_time,
      "days" => json_encode($request->days)
    ]);

    return redirect()->back()->with('message', 'New routine has been created!');
  }

  /**
   * Display the specified resource.
   */
  public function show(string $id)
  {
    //
  }

  /**
   * Show the form for editing the specified resource.
   */
  public function edit(string $id)
  {
    //
  }

  /**
   * Update the specified resource in storage.
   */
  public function update(Request $request, string $id)
  {
    //
  }

  /**
   * Remove the specified resource from storage.
   */
  public function destroy(string $id)
  {
    //
  }
}
