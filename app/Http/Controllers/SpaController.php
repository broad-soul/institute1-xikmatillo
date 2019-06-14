<?php

namespace App\Http\Controllers;

use App\Model\MainPage\AboutUs;
use App\Model\NonResidents;
use App\Model\Residents;
use App\Model\Titles\Logo;
use Illuminate\Http\Request;

class SpaController extends Controller
{
    public function index()
    {
        return view('app');
    }

    public function main_get()
    {
        return [
            'about_us' => AboutUs::all()[0],
            'logo' => Logo::all()[0]
        ];
    }

    public function main_store(Request $request)
    {
        return AboutUs::add($request->about_us);
    }

    public function titles_store(Request $request)
    {
        Logo::add($request->all());
        return ['logo' => Logo::all()];
    }

    public function get_titles()
    {
        return [ 'logo' => Logo::all()[0] ];
    }
}
