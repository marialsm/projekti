/* UserController on Userin tietokantaoperaatiot
ja autentikaation sisältävä kontrolleri.

Se sisältää kaksi metodia: registerUser jolla
luodaan uusi käyttäjä kantaan, joka pääsee samantien muokkaamaan kantaa

ja authenticateUser, jolla suoritetaan autentikaatio, eli lähetetään tunnarit ja verrataan niitä kannassa oleviin, ja
jos on samat, päästetään tekemään kannan muokkausta.
*/

const bcrypt = require('bcryptjs');
const User = require('../model/User.js');
const createToken = require('../createtoken.js');

const UserController = {
  // uuden käyttäjän rekisteröinti
  registerUser: function (req, res, next) {
    // passu kryptataan ennen kantaan laittamista
    const hashedPassword = bcrypt.hashSync(req.body.password, 8);

    User.create(
      {
        username: req.body.username,
        password: hashedPassword,
        isadmin: req.body.isadmin,
      },
      (err, user) => {
        if (err) {
          return res.status(500).send('New user creation failed.');
        } else {
          const token = createToken(user); // tokenin luontimetodi
          // palautetaan token JSON-muodossa
          res.json({
            success: true,
            message: 'New token created!',
            token: token,
          });
        }
      }
    );
  },
  // olemassa olevan käyttäjän autentikaatio
  // jos autentikaatio onnistuu, käyttäjälle luodaan token
  authenticateUser: function (req, res, next) {
    // etsitään käyttäjä kannasta http-pyynnöstä saadun käyttäjätunnuksen perusteella
    User.findOne(
      {
        username: req.body.username,
      },
      function (err, user) {
        if (err) {
          throw err;
        }
        if (!user) {
          res.json({
            success: false,
            message: 'Authentication failed, no such user.',
          });
        } else if (user) {
          // console.log(req.body.password); // lomakkelle syötetty salasana
          // console.log(user.password); // kannassa oleva salasana
          // verrataan lomakkeelle syötettyä salasanaa kannassa olevaan salasanaan
          // jos vertailtavat eivät ole samat, palautetaan tieto siitä että salasana oli väärä
          if (bcrypt.compareSync(req.body.password, user.password) === false) {
            res.json({
              success: false,
              message: 'Authentication failed, wrong password.',
            });
          } else {
            // jos salasanat ovat samat, luodaan token
            const token = createToken(user); // tokenin luontimetodi
            // palautetaan token JSON-muodossa
            res.json({
              success: true,
              message: 'New token created!',
              token: token,
            });
          }
        }
      }
    );
  },
};

module.exports = UserController;
