import Discord from 'discord.js';
import customRoles from '../roles.json';
import invitesCmd from './commands/invites.js';
import updateme from './commands/updateme.js';

const invitesCalc = (bot, msg, cmd) => {
  const richEmbed = new Discord.RichEmbed();
  let user = msg.author.id;
  let max = 0;
  let numberUses;
  let invites = msg.guild.fetchInvites()
    .then(result => {
      let inviteArr = result.array();
      for (let i = 0; i < inviteArr.length; i++) {
        let invite = inviteArr[i];
        if (invite.inviter.id === user) {
          numberUses = invite.uses;

          if (numberUses > max) {
            max = numberUses;
          }
        }
      }
      numberUses = max;

      let roleNames = Object.keys(customRoles);
      let roleNums = Object.values(customRoles);

      let nextRole;
      let roleNumber;

      let highestRole = false;

      for (i = 0, i < roleNums.length; i++;) {
        if (numberUses < roleNums[i]) {
          [nextRole, roleNumber] = [roleNames[i], roleNums[i]];
          highestRole = false;
        }
        else {
          highestRole = true;
        }
      }

      if (highestRole = true) {
        msg.channel.send({
          embed: richEmbed
                  .setColor('#ffffff')
                  .setDescription(`You are the highest role of **${roleNames[5]}** with ${numberUses} invites.`)
        })
        
        updateme(msg, numberUses, numberLeft, nextRole);
        return; // no further calculation needed
      }
      let numberLeft = roleNumber - numberUses;
      let hasInviteLink = true;
      if (isNaN(numberLeft) && numberUses === 0) hasInviteLink = false;

      if (hasInviteLink) {
        invitesCmd(msg, numberUses, numberLeft, nextRole);
        updateme(msg, numberUses, numberLeft, nextRole);
      } else {
        msg.channel.send({
          embed: richEmbed
                  .setColor('#ffffff')
                  .setDescription(`You must create an invite link.`)
        });
        return;
      }
  });
}

export default invitesCalc;
