<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Message;
use DB;

class MessageController extends Controller
{
    public function index()
    {
        $userId = auth()->id();
    
        return Message::select(
                'id',
                //DB::raw("IF(`from_id`=$userId, TRUE, FALSE) as wirterMe"),
                DB::raw("(CASE WHEN from_id = $userId THEN TRUE ELSE FALSE END) as written_By_Me"), 
                'created_at',
                'content')
            ->get();
    }

    public function store(Request $request)
    {   
        $message = new Message();
        $message->from_id= auth()->id();
        $message->to_id= $request->to_id;
        $message->content=$request->content;
        $saved = $message->save();

        $data = [];
        $data['success'] = $saved;
        return $data;
    }
}
