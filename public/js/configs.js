// import VueTheMask from 'vue-the-mask.js'

var app = new Vue({
    el: '#content',
    data: {
        senha: null,
        confirmSenha: null,
        user: usuario,
        cidades: null,
    },
    methods: {

    // ---------------------------------------------------------------------------
    //          METODOS DAS INFORMACOES BASICAS
    // ---------------------------------------------------------------------------

        salvarUsuario: function(e){
            this.user.des_slug = this.user.des_slug.replace(/[^a-zA-Z À-ú 0-9]/g, "");
            if(!this.user.des_slug){
                swal ( "Oops!" ,  "O campo 'Nome de Usuário' não pode estar vazio!" ,  "error" );
            }else{
                des_slug = this.user.des_slug;
                // this.user.des_slug = this.user.des_slug.replace(",", "");
                $.post('post/up_generico',
                {
                    campo   : 'des_slug',
                    valor   : this.user.des_slug,
                    id      : $('#id_usuario_logado').val(),
                },
                function(data){
                    if((data == 1)||(data == true)){
                        swal ( "Sucesso!" ,  "As alterações foram salvas." ,  "success" );
                        $(".linkSlug").attr("href", des_slug);
                    }else{
                        swal ( "Oops!" ,  "O nome de usuário já existe!" ,  "error" );
                    }
                });
            }
        },

        salvarNome: function(e){
            this.user.des_nome = this.user.des_nome.replace(/[^a-zA-Z À-ú]/g, "");
            if(!this.user.des_nome){
                swal ( "Oops!" ,  "O campo 'Nome Completo' não pode estar vazio!" ,  "error" );
            } else if(this.user.des_nome.length < 6){
                swal ( "Oops!" ,  "O campo 'Nome Completo' deve ter mais de 6 caracteres!" ,  "error" );
            } else{
                $.post('post/up_generico',
                {
                    campo   : 'des_nome',
                    valor   : this.user.des_nome,
                    id      : $('#id_usuario_logado').val()
                },
                function(data){
                });
                swal ( "Sucesso!" ,  "As alterações foram salvas." ,  "success" );
            }
        },

        salvarNomeExibicao: function(e){
            this.user.des_nome_exibicao = this.user.des_nome_exibicao.replace(/[^a-zA-Z À-ú]/g, "");
            if (!this.user.des_nome_exibicao) {
                swal ( "Oops!" ,  "O campo 'Nome de Exibição' não pode estar vazio!" ,  "error" );
            } else if(this.user.des_nome_exibicao.length < 6) {
                swal ( "Oops!" ,  "O campo 'Nome de Exibição' deve ter mais de 6 caracteres!" ,  "error" );
            } else {
                // let res = (this.user.des_nome_exibicao.split(" "));
                // $('#navbar-username').text(res[0]);
                $('#navbar-username').text(this.user.des_nome_exibicao);
                $.post('post/up_generico',
                    {
                        campo   : 'des_nome_exibicao',
                        valor   : this.user.des_nome_exibicao,
                        id      : $('#id_usuario_logado').val()
                    },
                    function(data){
                    });
                    swal ( "Sucesso!" ,  "As alterações foram salvas." ,  "success" );
            }
        },

        salvarEmail: function(e){
            if(!this.user.des_email){
                swal ( "Oops!" ,  "O campo 'Email' não pode estar vazio!" ,  "error" );
            } else {
                $('#emailLogged').text(this.user.des_email);
                $.post('post/up_email',
                {
                    email   : this.user.des_email,
                    id      : $('#id_usuario_logado').val(),
                },
                function(data){
                    if((data == 1)||(data == true)){
                        swal ( "Sucesso!" ,  "As alterações foram salvas." ,  "success" );
                    } else {
                        swal ( "Oops!" ,  "Email inválido ou já cadastrado!" ,  "error" );
                    }
                });
            }
        },

        salvarOcupacao: function(e){
            $.post('post/up_generico',
            {
                campo   : 'des_ocupacao',
                valor   : this.user.des_ocupacao,
                id      : $('#id_usuario_logado').val(),
            },
            function(data){
            });
            swal ( "Sucesso!" ,  "As alterações foram salvas." ,  "success" );
        },

    // ---------------------------------------------------------------------------
    //          METODOS DAS INFORMACOES Pessoais
    // ---------------------------------------------------------------------------

        salvarCelular: function(e){
            $.post('post/up_generico',
            {
                campo   : 'des_telefone',
                valor   : this.user.des_telefone,
                id      : $('#id_usuario_logado').val(),
            },
            function(data){
            });
            swal ( "Sucesso!" ,  "As alterações foram salvas." ,  "success" );
        },

        salvarCpf: function(e){
            $.post('post/up_generico',
            {
                campo   : 'des_cpf',
                valor   : this.user.des_cpf,
                id      : $('#id_usuario_logado').val(),
            },
            function(data){
            });
            swal ( "Sucesso!" ,  "As alterações foram salvas." ,  "success" );
        },

        salvarDtNasc: function(e){
            $.post('post/up_generico',
            {
                campo   : 'dt_nasc',
                valor   : this.user.dt_nasc,
                id      : $('#id_usuario_logado').val(),
            },
            function(data){
            });
            swal ( "Sucesso!" ,  "As alterações foram salvas." ,  "success" );
        },

        salvarSexo: function(e){
            $.post('post/up_generico',
            {
                campo   : 'des_sexo',
                valor   : this.user.des_sexo.substr(0, 1),
                id      : $('#id_usuario_logado').val(),
            },
            function(data){
            });
            swal ( "Sucesso!" ,  "As alterações foram salvas." ,  "success" );
        },

        salvarCEP: function(){
            $.get('http://api.postmon.com.br/v1/cep/'+this.user.des_cep,
                { },
                function(data){
                    $.post('post/up_cep',
                        {
                            cep     : data['cep'],
                            cidade  : data['cidade'],
                            id      : $('#id_usuario_logado').val(),
                        },
                        function(data){ });

                    $('#cidadeUsr').val(data['cidade']);
                    swal ( "Sucesso!" ,  "As alterações foram salvas." ,  "success" );
                }
            );
        },

        deletarConta: function(e){
            let id_usuario = $('#id_usuario_logado').val();
            swal({
                title: "Realmente deseja deletar sua conta?",
                text: "Esta ação não poderá ser desfeita e todos os dados da sua conta serão deletados.",
                icon: "warning",
                buttons: ["Cancelar", "Deletar"],
                dangerMode: true,
              })
              .then((willDelete) => {
                if (willDelete) {
                    $.post('post/rm_usuario',
                    {
                        id_usuario: id_usuario
                    },function(data){
                        window.location.href = 'home';
                    });
                }
              });
        },

    // ---------------------------------------------------------------------------
    //          METODOS PARA ALTERAR SENHA
    // ---------------------------------------------------------------------------

        salvarSenha: function(e){
            if(this.senha !== this.confirmSenha){
                swal ( "Oops!" ,  "As senhas não são iguais!" ,  "error" );
            }else if(this.senha.length < 8){
                swal ( "Oops!" ,  "A senha deve conter no mínimo 8 digítos!" ,  "error" );
            }else{
                $.post('post/up_generico',
                {
                    campo   : 'des_senha',
                    valor   : this.senha,
                    id      : $('#id_usuario_logado').val(),
                },
                function(data){
                });
                this.senha = null;
                this.confirmSenha = null;
                swal ( "Sucesso!" ,  "As alterações foram salvas." ,  "success" );
            }
        },
    }
});
