<?php

use App\Http\Controllers\DemoController;
use App\Http\Controllers\NewsController;
use Illuminate\Support\Facades\Route;




//__        API ROUTES       __//

// News
Route::controller(NewsController::class)->group(function () {
    Route::get('/newsById/{id}', 'newsById');
    Route::get('/newsListByCategory/{name}', 'newsListByCategory');
    Route::get('/breakingNewsList', 'breakingNewsList');
});