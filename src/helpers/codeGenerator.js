import Haikunator from 'haikunator';

import { Invite } from 'src/models';

export default async function codeGenerator() {
  const haikunator = new Haikunator({
    adjectives: [
      'happy', 'exciting', 'generous', 'gleeful',
      'jolly', 'eloped', 'thrilled', 'cheerful',
      'joyous', 'delighted','sunny', 'beloved',
      'inspiring', 'wishful', 'committed',
      'heartfelt', 'romantic', 'beautiful', 'lucky',
      'elegant', 'caring', 'handsome' 
    ],
    nouns: [
      'wedding', 'cake', 'flower', 'gift', 'bouquet',
      'groom', 'bride', 'christmas', 'succulent',
      'icing', 'petal', 'tree', 'elf', 'snowman',
      'winter', 'santa', 'snow', 'dress', 'suit',
      'love'
    ],
    defaults: { 
      delimiter: "-",
      tokenLength: 0,
    }
  });

  let code = haikunator.haikunate();

  const existingRecords = await Invite.count({ where: { code } });

  if (existingRecords) {
    code = await codeGenerator();
  }

  return code;
}