<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Laravel\Socialite\Facades\Socialite;


class GoogleController extends Controller
{
    public function redirect() 
    {
        return Socialite::driver('google')->redirect();
    }

    public function callback() 
    {
        $user = Socialite::driver('github')->user();
        return redirect('dashboard');
    }
}
