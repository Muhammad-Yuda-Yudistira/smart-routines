<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;
use App\Models\Resolution;
use App\Models\Routine;
use App\Models\Category;
use Illuminate\Validation\Rule;
use Illuminate\Support\Facades\Storage;

class ResolutionController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $data = Resolution::where('user_id', auth()->user()->id)->with('category')->latest()->get();
        $routines = Routine::where('user_id', auth()->user()->id)->get();
        return Inertia::render('Resolutions/Index', [
            'title' => 'Resolution',
            'data' => $data,
            'routines' => $routines,
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        $categories = Category::all();
        return Inertia::render('Resolutions/Form', [
            'title' => 'Create Resolution',
            'categories' => $categories
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $request->validate([
            'title' => 'required|string|max:100',
            'type' => ['required', 'string', Rule::in(['Obligation', 'Lifestyle'])],
            'period' => ['required', 'string', Rule::in(['Daily','Weekly','Monthly','Yearly'])],
            'category_id' => 'required',
            'goal' => 'required|string',
            'description' => 'required|string',
            'image' => 'required|image|file|max:1024'
        ]);
        $imageName = $request->file('image')->store('resolution-image');

        Resolution::create([
            'title' => $request->title,
            'type' => $request->type,
            'period' => $request->period,
            'category_id' => $request->category_id,
            'goal' => $request->goal,
            'description' => $request->description,
            'image' => $imageName,
            'user_id' => auth()->user()->id
        ]);
        // PR: redirect ke resolutions page
        return redirect()->route('resolutions.index')->with('message', 'Resolution has been created!');
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(string $id)
    {
        $resolution = Resolution::find($id);
        $categories = Category::all();
        return Inertia::render('Resolutions/Form', [
            'title' => 'Edit Resolution',
            'categories' => $categories,
            'resolution' => $resolution
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        $resolution = Resolution::find($id);

        // if($request->file('image')->store('resolution-image'))
        // {
        //     // $newImageName = $request->file('image')->store('resolution-image');
        //     // Storage::delete($resolution->image);

        //     $resolution->update([
        //         'title' => $request->title,
        //         'type' => $request->type,
        //         'period' => $request->period,
        //         'category_id' => $request->category_id,
        //         'goal' => $request->goal,
        //         'description' => $request->description,
        //         // 'image' => $newImageName,
        //     ]);

        // } else
        // {
        //     $resolution->update([
        //         'title' => $request->title,
        //         'type' => $request->type,
        //         'period' => $request->period,
        //         'category_id' => $request->category_id,
        //         'goal' => $request->goal,
        //         'description' => $request->description,
        //         // 'image' => $request->image,
        //     ]);
        // }

        $request->validate([
            'title' => 'required|string|max:100',
            'type' => ['required', 'string', Rule::in(['Obligation', 'Lifestyle'])],
            'period' => ['required', 'string', Rule::in(['Daily', 'Weekly', 'Monthly', 'Yearly'])],
            'category_id' => 'required|numeric',
            'goal' => 'required|string',
            'description' => 'required|string|',
        ]);

        $resolution->update([
            'title' => $request->title,
            'type' => $request->type,
            'period' => $request->period,
            'category_id' => $request->category_id,
            'goal' => $request->goal,
            'description' => $request->description,
            // 'image' => $request->image,
        ]);
        return redirect('dashboard/resolutions')->with('message', 'Resolution has been updated!');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {

        $resolution = Resolution::find($id);

        Storage::delete($resolution->image);
        $resolution::destroy($id);

        return redirect()->back()->with('message', 'Resolution has been deleted!');
    }
}
