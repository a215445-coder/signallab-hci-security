import account from '../assets/exhibition/account.jpg';
import library from '../assets/exhibition/library.jpg';
import grant from '../assets/exhibition/grant.jpg';
import timetable from '../assets/exhibition/timetable.jpg';
import research from '../assets/exhibition/research.jpg';
import subdomain from '../assets/exhibition/subdomain.jpg';

// Literal keyword imagery. The asset map receives no answer or warning state.
export const caseTopics = {
  account:'Student account', library:'Library', grant:'Scholarship',
  timetable:'Timetable', research:'Research invitation', subdomain:'Web domain'
};
const pictures={account,library,grant,timetable,research,subdomain};
export function caseVisual(id){
 if(!pictures[id])return null;
 return `<div class="case-visual keyword-visual" data-case-scene="${id}" data-visual="image" aria-hidden="true"><img class="case-generated" src="${pictures[id]}" alt="" width="1104" height="736" decoding="async" draggable="false"><span class="case-topic">${caseTopics[id]}</span></div>`;
}
