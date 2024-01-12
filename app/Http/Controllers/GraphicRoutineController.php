<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;
use App\Models\routine;
use App\Models\category;


class GraphicRoutineController extends Controller
{
    public function index()
    {
        $routines = Routine::where('user_id', auth()->user()->id)->orderBy('start_time', 'ASC')->with('category')->get();
        $categories = Category::all();

        return Inertia::render('Routines/Graphic', [
            'title' => 'Graphic',
            'routines' => $routines,
            'categories' => $categories
        ]);
    }
}
