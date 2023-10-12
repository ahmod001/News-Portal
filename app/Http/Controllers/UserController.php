<?php

namespace App\Http\Controllers;

use App\Helper\JWTToken;
use App\Helper\ResponseHelper;
use App\Mail\OTPMail;
use App\Models\User;
use Exception;
use Illuminate\Http\Request;
use Mail;

class UserController extends Controller
{
    function userLogin(Request $request)
    {
        $email = $request->email;
        $otp = mt_rand(1000, 9999); //4 digit

        try {
            Mail::to($email)->send(new OTPMail($otp));
            User::updateOrCreate(['email' => $email], ['email' => $email, 'otp' => $otp]);
            return ResponseHelper::success('6-digit code sent to your email');
        } catch (Exception $e) {
            return ResponseHelper::failed('Verification code sending failed');
        }
    }

    function userRegister(Request $request)
    {
        try {
            $user = User::where('email', $request->input('email'))->first();
            if ($user !== null) {
                User::create($request);
                return ResponseHelper::success('user created successfully');
            } else {
                return ResponseHelper::failed('email already exists');
            }
        } catch (Exception $e) {
            return ResponseHelper::failed('something went wrong');
        }
    }

    function userUpdate(Request $request)
    {
        $userId = $request->header('userId');

        try {
            User::where('id', $userId)->update($request);
            return ResponseHelper::success('user updated successfully');
        } catch (Exception $e) {
            return ResponseHelper::failed('user updating failed');
        }
    }

    function verifyOtp(Request $request)
    {
        $email = $request->input('email');
        $otp = $request->input('otp');

        try {
            $userId = User::where('email', $email)->where('otp', $otp)->select('id')->first();

            if ($userId !== null) {
                // Generate token
                $token = JWTToken::createToken($userId->id, $email);

                // Reset otp
                User::where('email', $email)->update([
                    'otp' => 0
                ]);

                $expireCookie = time() + (60 * 60 * 24 * 30); //30 Days
                return ResponseHelper::success('login successful')->cookie('token', $token, $expireCookie);
            }

            throw new Exception("user not found", 404);

        } catch (Exception $e) {
            return ResponseHelper::failed('unauthorized', 401);
        }
    }

    function userLogout(Request $request)
    {
        return redirect('/login')->cookie('token', '', -1);
    }
}