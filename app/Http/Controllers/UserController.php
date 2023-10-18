<?php

namespace App\Http\Controllers;

use App\Helper\JWTToken;
use App\Helper\ResponseHelper;
use App\Mail\OTPMail;
use App\Models\User;
use Exception;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Mail;

class UserController extends Controller
{
    function profilePage()
    {
        return Inertia::render('Profile');
    }
    
    function loginPage()
    {
        return Inertia::render('Auth/Login');
    }

    function registerPage()
    {
        return Inertia::render('Auth/Register');
    }

    function forgotPasswordPage()
    {
        return Inertia::render('Auth/ForgotPassword');
    }

    function verifyOtpPage()
    {
        return Inertia::render('Auth/OTPVerification');
    }
    
    function resetPasswordPage()
    {
        return Inertia::render('Auth/ResetPassword');
    }

    function userRegister(Request $request)
    {
        $user = User::where('email', $request->input('email'))->count();
        try {
            if ($user > 0) {
                return ResponseHelper::failed('Email already exists');
            }

            User::create([
                'name' => $request->input('name'),
                'email' => $request->input('email'),
                'password' => $request->input('password')
            ]);
            return ResponseHelper::success('Registration successfully');

        } catch (Exception $e) {
            return ResponseHelper::failed('Registration failed');
        }
    }

    function userLogin(Request $request)
    {
        $count = User::where('email', $request->input('email'))
            ->where('password', $request->input('password'))
            ->select('id')->first();

        if ($count !== null) {
            $token = JWTToken::createToken($count->id, $request->input('email'), 'login');

            return response()->json([
                "status" => "success",
                "message" => "Login successful",
                "token" => $token
            ], 200)->cookie('token', $token, 60 * 24 * 30, null, null, true, false); // expire in 30 days

        } else {
            return response()->json([
                "status" => "failed",
                "message" => "Unauthorized"
            ], 401);
        }
    }

    function sendOTP(Request $request)
    {
        $email = $request->input('email');
        $count = User::where('email', $email)->count();

        if ($count === 1) {
            try {
                // Generate 4 digit Otp
                $otp = rand(1000, 9999);

                // Send OTP via Email
                Mail::to($email)->send(new OTPMail($otp));

                // Update on Database
                User::where('email', $email)->Update([
                    'otp' => $otp
                ]);

                return response()->json([
                    "status" => "success",
                    "message" => "4 digits otp verification code sent successfully"
                ], 200);

            } catch (Exception $e) {
                return response()->json([
                    "status" => "failed",
                    "message" => "Email sending failed"
                ], 500);
            }
        } else {
            return response()->json([
                "status" => "failed",
                "message" => "Unauthorized"
            ], 401);
        }
    }

    function verifyOTP(Request $request)
    {
        $email = $request->input('email');
        $otp = $request->input('otp');

        $count = User::where('email', $email)
            ->where('otp', $otp)
            ->count();

        if ($count === 1) {
            // Generate JWT 
            $token = JWTToken::createToken(0, $email, 'resetPassword');

            // Reset existing OTP in Database
            User::where('email', $email)->update([
                'otp' => '0'
            ]);

            return response()->json([
                "status" => "success",
                "message" => "otp verification successful",
                "token" => $token
            ], 200)->cookie('token', $token, 60 * 24 * 30); // expire in 30 days

        } else {
            return response()->json([
                "status" => "failed",
                "message" => "unauthorized"
            ], 401);
        }
    }

    function resetPassword(Request $request)
    {
        try {
            $email = $request->header('userEmail');
            User::where('email', $email)->update([
                'password' => $request->input('password')
            ]);

            return response()->json([
                "status" => "success",
                "message" => "Password updated successfully"
            ], 200);

        } catch (Exception $e) {
            return response()->json([
                "status" => "failed",
                "message" => "something went wrong"
            ], 500);
        }
    }

    function userUpdate(Request $request)
    {
        $userId = $request->header('userId');

        try {
            User::where('id', $userId)->update($request->input());
            return ResponseHelper::success('user updated successfully');
        } catch (Exception $e) {
            return ResponseHelper::failed('user updating failed');
        }
    }

    function userLogout(Request $request)
    {
        try {
            return ResponseHelper::success('Logout Successful')->cookie('token', '', -1);

        } catch (Exception $e) {
            return ResponseHelper::failed('Logout failed');
        }
    }

    function userProfile(Request $request)
    {
        $userId = $request->header('userId');
        return User::where('id', $userId)->first();
    }

}