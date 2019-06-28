<?php

namespace App\Http\Controllers;

use App\Model\Contests;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Storage;

class ContestsController extends Controller
{
    public function create(Request $request)
    {
        $file = $request->image;
        $ext = $file->getClientOriginalExtension();
        $fileName = str_random(10) . '.' . $ext;
        $file->storeAs('public', $fileName);
        $data = $request->all();
        $data['image'] = $fileName;
        $data['user_id'] = Auth::id();
        Contests::add($data);
    }

    public function edit($id)
    {
        return Contests::find($id);
    }

    public function update(Request $request)
    {
        $partner = Contests::find($request->id);
        $data = $request->all();
        $file = $request->image;
        $data['image'] = $partner->image;
        if ($file !== 'undefined') {
            Storage::delete('public/' . $partner->image);
            $ext = $file->getClientOriginalExtension();
            $fileName = str_random(10) . '.' . $ext;
            $file->storeAs('public', $fileName);
            $data['image'] = $fileName;
        }
        $partner->edit($data);
    }

    public function destroy($id)
    {
        Contests::find($id)->delete();
    }

    public function get_all()
    {
        return Contests::all();
    }

    public function get_one($id)
    {
        return Contests::find($id);
    }
}
