<?php

namespace Models;

use \Illuminate\Database\Eloquent\Model;

class Confirmacao extends Model
{
    protected $fillable = [
        'id_confirmacao',
        'id_usuario',
        'des_hash'
    ];

    protected $table = 'tb_confirmacao_email';
    public $timestamps = false;
}
