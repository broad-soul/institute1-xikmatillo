<?php

namespace App\Http\Controllers;

use App\Model\Contacts;
use Illuminate\Http\Request;

class ContactsController extends Controller
{
    public function save(Request $request)
    {
        $contacts = Contacts::find($request->id);
        if($contacts) $contacts->edit($request->all());
        else Contacts::create($request->all());
    }

    public function get()
    {
        return Contacts::all();
    }
}
