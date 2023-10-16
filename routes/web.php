<?php

use App\Http\Controllers\CommentController;
use App\Http\Controllers\NewsController;
use App\Http\Controllers\UserController;
use App\Http\Middleware\VerifyTokenMiddleware;
use Illuminate\Support\Facades\Route;

//__        PAGE ROUTES       __//
// News
Route::controller(NewsController::class)->group(function () {
    Route::get('/', 'homePage');
    Route::get('/collections/{categoryName}', 'newsByCategoryPage');
    Route::get('/news/details/{id}', 'newsDetailsPage');
});

Route::controller(UserController::class)->group(function () {
    Route::get('/login', 'loginPage');
    Route::get('/register', 'registerPage');
    Route::get('/forgot-password', 'forgotPasswordPage');
    Route::get('/verify-otp', 'verifyOtpPage');
    Route::get('/reset-password', 'resetPasswordPage');
});


//__        API ROUTES       __//
// News
Route::controller(NewsController::class)->group(function () {
    Route::get('/newsById/{id}', 'newsById');
    Route::get('/newsListByCategory/{name}', 'newsListByCategory');
    Route::get('/breakingNewsList', 'breakingNewsList');
    Route::get('/categoryList', 'categoryList');
});

// User
Route::controller(UserController::class)->group(function () {
    Route::post('/userRegister', 'userRegister');
    Route::post('/userLogin', 'userLogin');
    Route::post('/sendOtp', 'sendOTP');
    Route::post('/verifyOtp', 'verifyOTP');
    Route::get('/userLogout', 'userLogout');

    // Verify Token
    Route::post('/resetPassword', 'resetPassword')->middleware(VerifyTokenMiddleware::class);
    Route::get('/userProfile', 'userProfile')->middleware(VerifyTokenMiddleware::class);
    Route::post('/userUpdate', 'userUpdate')->middleware(VerifyTokenMiddleware::class);
});

// Comment
Route::controller(CommentController::class)->group(function () {
    Route::post('/createUpdateComment', 'createUpdateComment')->middleware(VerifyTokenMiddleware::class);
    Route::post('/deleteComment', 'deleteComment')->middleware(VerifyTokenMiddleware::class);
});