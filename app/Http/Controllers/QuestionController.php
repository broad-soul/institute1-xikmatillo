<?php

namespace App\Http\Controllers;

use App\Model\Faq;
use Illuminate\Http\Request;

class QuestionController extends Controller
{
    public function create(Request $request)
    {
        Faq::create($request->all());
        return Faq::all();
    }

    public function edit($id)
    {
        return Faq::find($id);
    }

    public function update(Request $request)
    {
        Faq::find($request->id)->edit($request->faq);
    }

    public function destroy($id)
    {
        Faq::find($id)->delete();
    }

    public function get_all()
    {
        return Faq::all();
    }

    public function get_one($id)
    {
        return Faq::find($id);
    }
}
