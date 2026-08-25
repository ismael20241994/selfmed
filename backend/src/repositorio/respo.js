import pool from "../config/db.js";
export async function getImg(dado) {
    try{
      const nid = dado.nid;
    const [rows] = await pool.query(
      'SELECT * FROM selfmedi WHERE nid = ?',
      [nid]
    );

    if (rows.length === 0) {
      return {
        status: 404,
        message: 'Usuário não encontrado', 
      };
    }

    return {
      status: true,
      imagem: rows[0]  
    };
    //console.log(rows[0])

  }catch(err){
    return{
      status: 500,
      mensagem: err.message
    }
  }
}

export async function createData(dado) {
  
  try{
    const sql = `INSERT INTO selfmedi(nome,nid,file) VALUES (?,?,?)`;
    const result = await pool.query(sql,[dado.nome,dado.nid,dado.imagem]);
    return {
      status:201,
      message:'Dados enviado com sucesso!'
    }
   
  }catch(err){
    return{
      status:500,
      message:err.message
    }
  }
  
};

export async function getCateg() {
  try{
    const [rows] = await pool.query(
      'SELECT id, nome FROM especialidades',
      
    );
    return{
      status: 200,
      message: rows
    }
  }catch(err){
    return{
      status:500,
      message:err.message
    }
  }
};

export async function nameClinic(dado) {
  try{
    const [rows] = await pool.query(
      'SELECT * FROM consultas WHERE especialidade = ?',
      [dado]
    );

    if (rows.length === 0) {
      return {
        status: false,
        message: 'Dado não disponivel', 
      };
    };

    return {
      status: true,
      dado: rows  
    };
  }catch(err){
    return{
      status:500,
      message:err.message
    }
  }
};

export async function pacSave(params) {
  try{
    const ob ={
      nome: params.nome,
      idade: params.idade,
      genero: params.genero,
      contacto: params.contacto,
      clinica: params.clinica,
      especialidade: params.especialidade,
      medico: params.medico,
      dia: params.dia,
      hora: params.hora,
      pac:params.pac

    };

    const sql = `INSERT INTO bigdb(
      nome,genero,idade,contacto,clinica,especialidade,medico,dia,hora,pac) VALUES (?,?,?,?,?,?,?,?,?,?)`;
    const [result] = await pool.query(sql,
      [ob.nome, ob.genero, ob.idade, ob.contacto, ob.clinica, ob.especialidade, ob.medico,ob.dia, ob.hora,ob.pac]);
    if(result.affectedRows === 0){
      return{
        succes: false,
        message: 'Erro durante a marcação de consulta!'
      };
    };

    return{
      succes: true,
      data: 'Sua consulta foi marcada com sucesso!'
    }
 
  }catch(err){
     return{
      succes: false,
      message: 'Error interno do servidor!'
    }
  }
};

export async function getConsultas (params){
  try{
    const [rows] = await pool.query(
      'SELECT * FROM bigdb WHERE pac = ?',
      [params]
    
    );

    if (rows.length === 0) {
      return {
        status: false,
        message: 'Dado não disponivel', 
      };
    };
    return {
      status: 200,
      message: rows
    }
  }catch(err){
     return{
      status:500,
      message:'error ao buscar dados dados!'
    }
  }
};

export async function saveRegis(params) {
  try{
    
    const sql = `INSERT INTO self_user(
      nome,contacto,email,senha,pac) VALUES (?,?,?,?,?)`;
    const [result] = await pool.query(sql,
      [params.nome, params.contacto, params.email, params.senha, params.pac]);
    if(result.affectedRows > 0){
      return{
        success: true,
        message: params.pac
      };
    }

    return{
      success: false,
      message: 'erro na criação da conta!'
    }
    
  }catch(err){
    console.log(err)
     return{
      success:false,
      message:'error na criação da conta!'
    }
  }
};

export async function getUser(params) {
  try{
    const [rows] = await pool.query(
      'SELECT * FROM self_user WHERE  pac = ? AND senha = ?',
      [params.pac, params.senha]
    );

    if(rows.length === 0) {
      return {
        success: false,
        message: 'Usuario não encontrado' 
      }
    };

    return {
      success: true,
      data: rows
    }

    console.log(rows)

  }catch(err){
     return{
      success:false,
      message:'error ao buscar dados!'
    }
  }
}

export async function allPacs() {
  try{

    const [rows] = await pool.query(
      'SELECT * FROM self_user' 
    );

    if(rows.length === 0) {
      return {
        success: false,
        message: 'Dados não encontrado' 
      }
    };

    return{
      success: true,
      data: rows
    }
  }catch(err){
    return{
      success: false,
      message: err.message
    }
  }
}

export async function pacDate(params) {
  
  try{
    const data = {
      nome: params.nome,
      genero: params.genero,
      idade: params.idade,
      contacto: params.contacto,
      email: params.email,
      id: params.id
    }
    console.log(data.email);

    const [result] = await pool.query(`
      UPDATE self_user
        SET nome = ?, genero = ?, idade = ?, contacto = ? , email = ?
        WHERE id = ?
        `,
      [data.nome,data.genero, data.idade, data.contacto, data.email, data.id]
  
    );

    if (result.affectedRows === 0) {
        return {
          success: false,
          message: "Erro na edição de dados"
        };
    }

    return {
      success: true,
      data: "Usuário atualizado com sucesso"
    
    };
  }catch(err){
    return{
      succes: false,
      message: 'erro na actualizacao de dados!'
    }
  }
 
}

export async function  deletar(params) {
  try{
    const [result] = await pool.query(
      'DELETE FROM bigdb WHERE id = ?',
      [params]
    );

    if (result.affectedRows === 0) {
      return{
        status: 404,
        message: "Usuário não encontrado"
      };
    }

    return{
      success: true,
      data:  `Consulta Nº: ${params} foi removidos com sucesso!`
    }
  }catch(err){
    return{
      success: false,
      message: `Não foi possivel remover a consulta Nº: ${params}`
    }
  }
};

export async function apagar(params) {
  try{
    const [result] = await pool.query(
      'DELETE FROM self_user WHERE id = ?',
      [params]
    );

    if (result.affectedRows === 0) {
      return{
        status: 404,
        message: "Usuário não encontrado"
      };
    }

    return{
      success: true,
      data:  `Dados removidos com sucesso!:${params}`
    }
  }catch(err){
    return{
      success: false,
      message: `Não foi possivel remover pac: ${params}`
    }
  }
};

export async function getAllConsult() {
  try{

    const [rows] = await pool.query(
      'SELECT * FROM bigdb' 
    );

    if(rows.length === 0) {
      return {
        success: false,
        message: 'Dados não encontrado' 
      }
    };

    return{
      success: true,
      data: rows
    }
  }catch(err){
    return{
      success: false,
      message: err.message
    }
  }
};

export async function updateEstado(params) {
  try{
    
    const [result] = await pool.query(`
      UPDATE bigdb
        SET estado = ?
        WHERE id = ?
        `,
      [params.estado, params.id]
  
    );

    if (result.affectedRows === 0) {
        return {
          success: false,
          message: "Erro na edição de dados"
        };
    }

    return {
      success: true,
      data: "Usuário atualizado com sucesso"
    
    };
  }catch(err){
    return{
      success: false,
      message: 'erro na actualizacao de dados!'
    }
  } 
};

export async function getAllRegistedClinica() {
  try{
    const [rows] = await pool.query(
      'SELECT * FROM consultas' 
    );

    if(rows.length === 0) {
      return {
        success: false,
        message: 'Dados não encontrado' 
      }
    };

    return{
      success: true,
      data: rows
    }
      
    
  }catch(err){
    return{
      success: false,
      message: 'erro interno de servidor'
    }
  }
};

export async function actualizarClinica(params) {
  try{
     
    const [result] = await pool.query(`
      UPDATE consultas
        SET nome = ?, md = ?, especialidade = ?, dia = ?, hora = ?
        WHERE id = ?
        `,
      [params.clinica, params.medico, params.especialidade, params.dia, params.horario, params.id]
  
    );

    if (result.affectedRows === 0) {
        return {
          success: false,
          message: "Erro na edição de dados"
        };
    }

    return {
      success: true,
      data: "Usuário atualizado com sucesso"
    
    };
  }catch(err){
    return{
      succes: false,
      message: err.message
    }
  }
};

export async function adicionarClinica(params) {
  try {
    const sql = `INSERT INTO consultas(
      nome,md,especialidade,dia,hora) VALUES (?,?,?,?,?)`;
    const [result] = await pool.query(sql,
      [params.clinica, params.medico, params.especialidade, params.dia, params.horario]);
    if(result.affectedRows === 0){
      return{
        success: false,
        message: 'Erro no registo da Clinica'
      };
    }
    return{
      success: true,
      data: 'Dados criado com sucesso!'
    }
  }catch(err){
    console.log(err.message)
     return{
      success:false,
      message:err.message
    }
  }
}

export async function solic_atestado(params) {
    try {
    const sql = `INSERT INTO atestado(
      cliente,genero,idade,clinica,data,contacto,pac) VALUES (?,?,?,?,?,?,?)`;
    const [result] = await pool.query(sql,
      [params.nome, params.genero, params.idade, params.clinica,params.data, params.contacto,params.pac]);
    if(result.affectedRows === 0){
      return{
        success: false,
        message: 'Erro na submisão do pedido'
      };
    }
    return{
      success: true,
      data: 'Pedido submetido com sucesso!'
    }
  }catch(err){
    console.log(err.message)
     return{
      success:false,
      message:'Erro interno do servidor'
    }
  }
};

export async function get_solic_atestado(params) {
  try{
    const [rows] = await pool.query(
      'SELECT * FROM atestado WHERE  pac = ?',
      [params]
    );

    if(rows.length === 0) {
      return {
        success: false,
        message: 'Usuario não encontrado' 
      }
    };

    return {
      success: true,
      data: rows
    }

  }catch(err){
     return{
      success:false,
      message:'error ao buscar dados!'
    }
  }
};

export async function get_all_atestado(params) {
  try{

    const [rows] = await pool.query(
      'SELECT * FROM atestado' 
    );

    if(rows.length === 0) {
      return {
        success: false,
        message: 'Dados não encontrado' 
      }
    };

    return{
      success: true,
      data: rows
    }
  }catch(err){
    return{
      success: false,
      message: err.message
    }
  }
}

export async function update_atestado(params) {
   try{
    const [result] = await pool.query(`
      UPDATE atestado
        SET status = ?
        WHERE id = ?
        `,
      [params.estado, params.id]
    );

    if (result.affectedRows === 0) {
        return {
          success: false,
          message: "Erro na actualização de dados"
        };
    }

    return {
      success: true,
      data: "Atestado atualizado com sucesso"
    };

  }catch(err){
    return{
      succes: false,
      message: err.message
    }
  }
}