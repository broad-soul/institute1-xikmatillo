<?php

namespace App\Http\Controllers;

use App\Model\Events;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Storage;

class EventsController extends Controller
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
        Events::add($data);
    }

    public function edit($id)
    {
        return Events::find($id);
    }

    public function update(Request $request)
    {
        $events = Events::find($request->id);
        $data = $request->all();
        $file = $request->image;
        $data['image'] = $events->image;
        if ($file !== 'undefined') {
            Storage::delete('public/' . $events->image);
            $ext = $file->getClientOriginalExtension();
            $fileName = str_random(10) . '.' . $ext;
            $file->storeAs('public', $fileName);
            $data['image'] = $fileName;
        }
        $events->edit($data);
    }

    public function destroy($id)
    {
        Events::find($id)->delete();
    }

    public function get_all()
    {
        return Events::all();
    }

    public function get_one($id)
    {
        return Events::find($id);
    }
}
