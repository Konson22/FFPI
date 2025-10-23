<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Module;


class ResourceController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $data = Module::with('lessons')->get();

        return response()->json($data, 200);
    }

    public function getModules()
    {
        return response()->json(config('srhr.modules'));
    }


    
}
