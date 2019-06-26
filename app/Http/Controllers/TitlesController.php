<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class TitlesController extends Controller
{
    public function create(Request $request)
    {
        Teachers::add($request->all());
    }

    public function edit($id)
    {
        return Teachers::find($id);
    }

    public function update(Request $request)
    {
        Teachers::find($request->id)->edit($request->event);
    }

    public function destroy($id)
    {
        Teachers::find($id)->delete();
    }

    public function all()
    {
        return Teachers::all();
    }

    public function one($id)
    {
        return Teachers::find($id);
    }
}
