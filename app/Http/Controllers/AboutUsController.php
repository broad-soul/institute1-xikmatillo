<?php

namespace App\Http\Controllers;

use App\Model\AboutUs;
use Illuminate\Http\Request;

class AboutUsController extends Controller
{
    public function create(Request $request)
    {
        AboutUs::add($request->all());
    }

    public function get()
    {
        return AboutUs::all();
    }
}
