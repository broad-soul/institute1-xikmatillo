<?php

namespace App\Http\Controllers;

use App\Model\Exports\NonResidentsExport;
use App\Model\Files;
use App\Model\InstructionApp;
use App\Model\NonResidents;
use Illuminate\Http\Request;

class NonResidentsController extends Controller
{
    public function create(Request $request)
    {
        $this->validate($request, [
            'direction_code' => 'required',
            'name' => 'required',
            'surname' => 'required',
            'father_name' => 'required',
            'date_of_birth' => 'required',
            'citizenship' => 'required',
            'client_requisite' => 'required',
            'residential_address' => 'required',
            'education_language' => 'required',
            'phone' => 'required',
            'files' => 'required',
        ]);

        $files_residents = NonResidents::add($request->all());
        $filesName = $files_residents->upload($request->file('files'));

        return response()->json([
            "message" => "Success",
            "files" => $filesName
        ], 200);
    }

    public function get_all()
    {
        return NonResidents::all();
    }

    public function get_one($id)
    {
        return NonResidents::find($id);
    }

    public function destroy(Request $request)
    {
        $resident = NonResidents::find($request->id);
        Files::remove($resident->name_archive_with_data);
        $resident->delete();
        return response()->json(["message" => "Success"], 200);
    }

    public function download_exel(Request $request)
    {
        $lang = $request->lang;
        return (new NonResidentsExport($lang))->download('non_residents_' . $lang . '.xlsx');
    }

    public function get_instruction()
    {
        return InstructionApp::where('is_resident', '0')->take(1)->get();
    }

    public function update_instruction(Request $request)
    {
        $app = InstructionApp::find($request->id);

        if($app) $app->edit($request->all());
        else {
            $data = $request->all();
            $data['is_resident'] = 0;
            InstructionApp::add($data);
        }
    }
}
