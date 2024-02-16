<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;

class GuideController extends Controller
{
    public function index()
    {
        $appName = env('APP_NAME', 'Unlimited!');
        return Inertia::render('Guides/Index', [
            'appName' => $appName,
        ]);
    }
}
