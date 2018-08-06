<?php

namespace controller;

use model\AnuncioModel;
//use model\object\ObjAnuncio;

class Busca
    {

        public function searchCount(string $q, $id)
        {
            $q = strip_tags($q);
            $result = AnuncioModel::join('tb_categorias', 'tb_categorias.id_categoria', '=', 'tb_anuncios.id_categoria')
            ->join('tb_usuarios', 'tb_anuncios.id_usuario', '=', 'tb_usuarios.id_usuario')
            ->where('tb_anuncios.id_usuario', '!=', $id)
            ->where('tb_categorias.des_descricao', 'LIKE', '%'.$q.'%')
            ->orWhere('tb_usuarios.des_nome', 'LIKE', '%'.$q.'%')
            ->orWhere('tb_anuncios.des_descricao', 'LIKE', '%'.$q.'%')
            ->orderBy('tb_anuncios.id_anuncio', 'desc')
            ->count();
            return $result;
        }

        public function search(string $q, $id, $limit, $to):array
        {
            $q = strip_tags($q);
            $result = AnuncioModel::join('tb_categorias', 'tb_categorias.id_categoria', '=', 'tb_anuncios.id_categoria')
                    ->join('tb_usuarios', 'tb_anuncios.id_usuario', '=', 'tb_usuarios.id_usuario')
                    ->where('tb_anuncios.id_usuario', '!=', $id)
                    ->where('tb_categorias.des_descricao', 'LIKE', '%'.$q.'%')
                    ->orWhere('tb_usuarios.des_nome', 'LIKE', '%'.$q.'%')
                    ->orWhere('tb_anuncios.des_descricao', 'LIKE', '%'.$q.'%')
                    ->select('tb_anuncios.*', 'tb_categorias.id_categoria', 'tb_usuarios.des_nome')
                    ->orderBy('tb_anuncios.id_anuncio', 'desc')
                    ->skip($limit)->take($to)
                    ->get();

            $anuncios = $this->setData($result);
            return $anuncios;
        }

        public function setData ($infos) :array
        {
            $anuncios = array();
            foreach ($infos as $key => $data) {
                $anuncios[$key] = new AnuncioModel();
                $anuncios[$key]->setAttribute('id_anuncio', $data['id_anuncio']);
                $anuncios[$key]->setAttribute('id_usuario', $data['id_usuario']);
                $anuncios[$key]->setAttribute('id_categoria', $data['id_categoria']);
                $anuncios[$key]->setAttribute('des_descricao', $data['des_descricao']);
                $preco = number_format($data['des_preco'], 2, ",", ".");
                $anuncios[$key]->setAttribute('des_preco', $preco);
                $anuncios[$key]->setAttribute('id_modalidade', $data['id_modalidade']);
                $anuncios[$key]->setAttribute('des_disponibilidade', $data['des_disponibilidade']);
            }
            return $anuncios;
        }

    }