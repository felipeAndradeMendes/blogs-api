const { loginService } = require('../services');
const { createToken } = require('../utils/JWT');

const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email.length || !password.length) {
      return res.status(400).json({ message: 'Some required fields are missing' });
    }

    const user = await loginService.login({ email, password });

    if (user.type) {
      return res.status(400).json({ message: user.message });
    }
    console.log('INFOS DO USER:', user.id, user.displayName);
    console.log('INFOS:', { data: { displayName: user.displayName, id: user.id } });
    // console.log('INFOS PARA PAYLOAD:', user.dataValues.displayName, user.dataValues.id);
    const payload = { data: { displayName: user.displayName, id: user.id } };

    const token = createToken(payload);

    return res.status(200).json({ token });
  } catch (error) {
    console.log(error);
    return res.status(500).json(error.message);
  }
};

module.exports = {
  login,
};

/*
Mudei os seguinte:
1- no service de login, de findAll foi pra findOne, alterando tb o if do erro, de !user.length para !user;
2- No controller de login, mudei o payload para enviar as infos corretas. Da maneira anteiror está enviando undefined;
tenho que verificar pq a resposta do verify do jwt não está retornando o displayName e Id, mas somente o iat...
*/