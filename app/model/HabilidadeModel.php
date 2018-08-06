<?php

    namespace model;

    use \Illuminate\Database\Eloquent\Model;

    class HabilidadeModel extends Model
    {
        protected $fillable = [
            'id_habilidade',
            'des_descricao',
            'des_status'
        ];

        protected $table = 'tb_habilidades';
        public $timestamps = false;

        public function usuario()
        {
            $this->hasMany(HabilidadeUsuarioModel::class, 'id_habilidade', 'id_habilidade');
        }

    }
