// Perdorim:  node scripts/makeAdmin.js email@shembull.com
const mongoose = require('mongoose');
const { MONGO_URI } = require('../config');
const User = require('../models/User');

const email = process.argv[2];

if (!email) {
  console.error('Perdorim: node scripts/makeAdmin.js <email>');
  process.exit(1);
}

(async () => {
  await mongoose.connect(MONGO_URI);

  const user = await User.findOneAndUpdate(
    { email: email.toLowerCase() },
    { role: 'admin' },
    { new: true }
  );

  if (!user) {
    console.error(`Nuk u gjet perdorues me email ${email}`);
    process.exit(1);
  }

  console.log(`${user.username} (${user.email}) eshte tani admin.`);
  await mongoose.disconnect();
})().catch(err => {
  console.error(err);
  process.exit(1);
});
