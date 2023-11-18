<?php

namespace App\Http\Controllers;

use App\Helper\ResponseHelper;
use App\Models\BreakingNews;
use App\Models\Category;
use App\Models\News;
use Illuminate\Http\Request;
use Inertia\Inertia;

class NewsController extends Controller
{
    function homePage()
    {
        return Inertia::render('Home');
    }

    function newsByCategoryPage(Request $request)
    {
        return Inertia::render('NewsByCategory', [
            'params' => $request->categoryName
        ]);
    }

    function newsDetailsPage(Request $request)
    {
        return Inertia::render('NewsDetails', [
            'params' => $request->id
        ]);
    }

    function searchResultsPage(Request $request)
    {
        return Inertia::render('SearchResult', [
            'params' => $request->query('q'),
        ]);
    }

    function breakingNewsList(Request $request)
    {
        return BreakingNews::latest()->take(10)->with('news')->get();
    }

    function newsListByCategory(Request $request)
    {
        $limit = $request->query('limit');
        $newses = Category::where('name', $request->name)->with([
            'news' => function ($query) use ($limit) {
                $query->latest()->limit($limit);
            }
        ]);
        return $newses->first();
    }

    function categoryList(Request $request)
    {
        return Category::pluck('name');
    }

    function newsById(Request $request)
    {
        return News::where('id', $request->id)->with('category', 'reporter')->first();
    }
    
    function newsListByTitle(Request $request)
    {
        $query = $request->title;
        return News::where('title', 'like', '%' . $query . '%')->paginate(10);
    }

}