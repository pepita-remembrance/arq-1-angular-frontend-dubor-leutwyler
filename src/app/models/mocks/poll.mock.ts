import {
  Friday as Viernes,
  Monday as Lunes,
  Saturday as Sabado,
  Thursday as Jueves,
  Tuesday as Martes,
  Wednesday as Miercoles
} from '../schedule';
import {tpi} from './career.mock';
import {Course} from '../career';
import {NotYet, AlreadyPassed, NoSuitableSchedule, Yes} from '../poll';

const skippedSubjects = ['Obj2', 'Redes', 'PConc', 'Mate2', 'IngSoft', 'UIs', 'EPers',
'PF', 'DesApp', 'LabSOR', 'Ing1', 'Ing2', 'Seg', 'BD2', 'ProyLib', 'InArq', 'Obj3', 'InBio', 'Politicas',
'Geo', 'Decl', 'videojuegos', 'DADC', 'CLP', 'SemMod', 'TIP'];


const from = new Date('November 26, 2017 10:13:00');
const to = new Date('December 26, 2017 10:13:00');
export const tpi2017s2 = tpi.newPoll('2017s2', tpi.filterSubjects(skippedSubjects), from, to);
export const tpiPolls = [tpi2017s2];

tpi2017s2.openPoll();

tpi2017s2.on('InPr').add(
  new Course('C1',
    Lunes.from(9).to(11, 30),
    Jueves.from(9).to(11, 30),
    Miercoles.from(9).to(12)
  ),
  new Course('C2',
    Lunes.from(12).to(14, 30),
    Jueves.from(12).to(14, 30),
    Miercoles.from(9).to(12)
  ),
  new Course('C3',
    Lunes.from(16).to(18, 30),
    Jueves.from(16).to(18, 30),
    Miercoles.from(18).to(21)
  ),
  new Course('C4',
    Lunes.from(19).to(21, 30),
    Jueves.from(19).to(21, 30),
    Miercoles.from(18).to(21)
  ),
);

tpi2017s2.on('Orga').add(
  new Course('C1',
    Martes.from(9).to(12),
    Viernes.from(9).to(12)
  ),
  new Course('C2',
    Martes.from(8, 30).to(11, 30),
    Sabado.from(9).to(12)
  ),
  new Course('C3',
    Martes.from(16).to(19),
    Viernes.from(16).to(19)
  ),
  new Course('C4',
    Martes.from(19).to(22),
    Viernes.from(19).to(22)
  ),
);

tpi2017s2.on('Mate1').add(
  new Course('C1',
    Martes.from(9).to(13),
    Viernes.from(9).to(13)
  ),
  new Course('C2',
    Lunes.from(18).to(22),
    Miercoles.from(18).to(22)
  ),
  new Course('C3',
    Lunes.from(9).to(13),
    Miercoles.from(9).to(13)
  ),
);

tpi2017s2.on('EstrD').add(
  new Course('C1',
    Martes.from(9).to(12),
    Miercoles.from(8).to(11)
  ),
  new Course('C2',
    Martes.from(9).to(12),
    Miercoles.from(11).to(14)
  ),
);

tpi2017s2.on('BD').add(
  new Course('C1',
    Martes.from(9).to(12),
    Miercoles.from(8).to(11)
  ),
  new Course('C2',
    Martes.from(9).to(12),
    Miercoles.from(11).to(14)
  ),
);

tpi2017s2.on('Obj1').add(
  new Course('C1',
    Miercoles.from(15).to(19),
    Jueves.from(14).to(18)
  ),
  new Course('C2',
    Lunes.from(18).to(22),
    Miercoles.from(18).to(22)
  ),
);

tpi2017s2.on('SO').add(
  new Course('C1',
    Martes.from(18).to(22),
    Jueves.from(18).to(20)
  ),
  new Course('C2',
    Lunes.from(18).to(22),
    Jueves.from(20).to(22)
  ),
);

tpi2017s2.on('TTI-TTU').add(
  new Yes,
);
