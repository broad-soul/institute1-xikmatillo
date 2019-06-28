<?php

namespace App\Http\Controllers;

use App\Model\Regulations;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Storage;

class RegulationsController extends Controller
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
        Regulations::add($data);
    }

    public function edit($id)
    {
        return Regulations::find($id);
    }

    public function update(Request $request)
    {
        $partner = Regulations::find($request->id);
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
        Regulations::find($id)->delete();
    }

    public function get_all()
    {
        return Regulations::all();
    }

    public function get_one($id)
    {
        return Regulations::find($id);
    }
}
