<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;

class DemoController extends Controller
{
    function homePage (){
        return Inertia::render('Demo');
    }
}
