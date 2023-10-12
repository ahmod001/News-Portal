<?php

namespace App\Http\Controllers;

use App\Models\BreakingNews;
use App\Models\Category;
use App\Models\News;
use Illuminate\Http\Request;

class NewsController extends Controller
{
    function breakingNewsList(Request $request)
    {
        return BreakingNews::latest()->take(10)->with('news')->get();
    }

    function newsListByCategory(Request $request)
    {
        return Category::where('name', $request->name)->with('news')->latest()->get();
    }

    function newsById(Request $request)
    {
        return News::where('id', $request->id)->with('category', 'reporter', 'comment', 'comment.user')->first();
    }

}