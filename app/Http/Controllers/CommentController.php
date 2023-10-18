<?php

namespace App\Http\Controllers;

use App\Helper\ResponseHelper;
use App\Models\Comment;
use Exception;
use Illuminate\Http\Request;

class CommentController extends Controller
{
    function commentListByNewsId(Request $request)
    {
        return Comment::where('news_id', $request->newsId)->latest()->with([
            'user' => function ($query) {
                $query->select('id', 'name', 'img');
            }
        ])->get();
    }

    function createUpdateComment(Request $request)
    {
        try {
            $userId = $request->header('userId');
            $commentId = $request->input('id');
            $newsId = $request->input('news_id');

            Comment::updateOrCreate(['id' => $commentId, 'news_id' => $newsId], [
                'description' => $request->input('description'),
                'news_id' => $newsId,
                'user_id' => $userId
            ]);

            return ResponseHelper::success();

        } catch (Exception $e) {
            return ResponseHelper::failed();
        }
    }

    function deleteComment(Request $request)
    {
        try {
            $userId = $request->header('userId');
            $commentId = $request->input('id');
            $newsId = $request->input('news_id');

            Comment::where(['id' => $commentId, 'news_id' => $newsId, 'user_id' => $userId])->delete();

            return ResponseHelper::success('Deleted successfully');

        } catch (Exception $e) {
            return ResponseHelper::failed('Failed to delete');
        }
    }
}