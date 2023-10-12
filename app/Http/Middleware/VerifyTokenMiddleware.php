<?php

namespace App\Http\Middleware;

use App\Helper\JWTToken;
use Closure;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;

class VerifyTokenMiddleware
{
    /**
     * Handle an incoming request.
     *
     * @param  \Closure(\Illuminate\Http\Request): (\Symfony\Component\HttpFoundation\Response)  $next
     */
    public function handle(Request $request, Closure $next): Response
    {
        $token = $request->cookie('token');
        $result = JWTToken::verifyToken($token);

        if ($result === 'unauthorized') {
            return redirect('/login');
        }

        $request->headers->set('userId', $result->user_id);
        $request->headers->set('userEmail', $result->user_email);
        return $next($request);
    }
}