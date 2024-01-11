<?php

use App\Http\Controllers\ProfileController;
use App\Http\Controllers\RoutineController;
use App\Http\Controllers\GraphicRoutineController;
use App\Http\Controllers\ResolutionController;
use App\Http\Controllers\GuideController;
use App\Http\Controllers\GoogleController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use League\CommonMark\Extension\CommonMark\Node\Inline\Link;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

Route::get('/', function () {
    return Inertia::render('Homepage/Homepage');
})->middleware('guest')->name('homepage');

Route::get('/routines', function () {
    return Inertia::render('Routines/Routines');
})->middleware('guest');

Route::get('/dashboard', function () {
    return Inertia::render('Dashboard');
})->middleware(['auth', 'verified'])->name('dashboard');

// user access
Route::middleware('auth')->group(function() {
    Route::resource('/dashboard/routines', RoutineController::class);
    Route::resource('/dashboard/resolutions', ResolutionController::class);
    Route::get('/dashboard/graphic', [GraphicRoutineController::class, 'index'])->name('graphic.routines.index');
});

// common access
Route::get('/guides', [GuideController::class, 'index'])->name('guides.index');

// oauth google
Route::get('/auth/google/redirect', [GoogleController::class, 'redirect'])->name('google.redirect');
Route::get('/google/redirect', [GoogleController::class, 'callback'])->name('google.callback');
// Route::get('/auth/redirect', function () {
//     return Socialite::driver('github')->redirect();
// });
// Route::get('/auth/callback', function () {
//     $user = Socialite::driver('github')->user();
 
    // $user->token
// });

// Route::get('/', function () {
//     return Inertia::render('Welcome', [
//         'canLogin' => Route::has('login'),
//         'canRegister' => Route::has('register'),
//         'laravelVersion' => Application::VERSION,
//         'phpVersion' => PHP_VERSION,
//     ]);
// });

Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});

require __DIR__ . '/auth.php';
