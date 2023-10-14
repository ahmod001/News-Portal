<?php
namespace App\Helper;

use Exception;
use Firebase\JWT\JWT;
use Firebase\JWT\Key;

class JWTToken
{
    public static function createToken(int|string $id, string $email, string $type): string
    {
        $key = env('JWT_KEY');
        $expire = $type === 'login' ?
            time() + (60 * 60 * 24) : //24 Hours
            time() + (60 * 10); // 10 Minutes

        $payload = [
            "iss" => "laravel-token",
            "iat" => time(),
            "exp" => $expire,
            "user_email" => $email,
            "user_id" => $id
        ];

        return JWT::encode($payload, $key, 'HS256');
    }

    public static function verifyToken($token): string|object
    {
        $key = env('JWT_KEY');

        try {
            if ($token !== null) {
                return JWT::decode($token, new Key($key, 'HS256'));
            }
            throw new Exception("unauthorized", 1);

        } catch (Exception $e) {
            return "unauthorized";
        }
    }
}