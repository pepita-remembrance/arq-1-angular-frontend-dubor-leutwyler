import {Career, Subject} from '../career';

export const tpiSubjects = [
  // Basicas
  ['InPr', 'Introduccion a la Programacion'],
  ['Orga', 'Organizacion de Computadoras'],
  ['Mate1', 'Matematica I'],
  ['Obj1', 'Programacion con Objetos I'],
  ['BD', 'Bases de Datos'],
  ['EstrD', 'Estructuras de Datos'],
  ['Obj2', 'Programacion con Objetos II'],
  // Avanzadas
  ['Redes', 'Redes de Computadoras'],
  ['SO', 'Sistemas Operativos'],
  ['PConc', 'Programacion Concurrente'],
  ['Mate2', 'Matematica II'],
  ['IngSoft', 'Elementos de Ingenieria de Software'],
  ['UIs', 'Construccion de interfaces de Usuario'],
  ['EPers', 'Estrategias de Persistencia'],
  ['PF', 'Programacion Funcional'],
  ['DesApp', 'Desarrollo de Aplicaciones'],
  ['LabSOR', 'Laboratorio de Redes y Sistemas Operativos'],
  // Idioma
  ['Ing1', 'Ingles I'],
  ['Ing2', 'Ingles II'],
  // Opcionales
  ['Seg', 'Seguridad Informatica'],
  ['BD2', 'Bases de Datos II'],
  ['ProyLib', 'Participacion y Gestion en Proyectos de Software Libre'],
  ['InArq', 'Introduccion a las Arquitecturas de Software'],
  ['Obj3', 'Programacion con Objetos III'],
  ['InBio', 'Introduccion a la Bioinformatica'],
  ['Politicas', 'Politicas Publicas en la Sociedad de la Informacion y la Era Digital'],
  ['Geo', 'Sistemas de Informacion Geografica'],
  ['Decl', 'Herramientas Declarativas en Programacion'],
  ['videojuegos', 'Introduccion al Desarrollo de Videojuegos'],
  ['DADC', 'Derechos de Autor y Derecho de Copia en la Era Digital'],
  // Seminarios
  ['CLP', 'Seminario: Caracteristicas de Lenguajes de Programacion'],
  ['SemMod', 'Seminario: Taller de Desarrollo de Servicios Web/Cloud Modernos'],
  // TTI/TTU
  ['TTI-TTU', 'Seminario sobre Herramientas o Tecnicas Puntuales'],
  // Trabajo Final
  ['TIP', 'Taller de Trabajo de Insercion Profesional'],
];

export const areas = [
  "Programacion",
  "Teoria de la Computacion",
  "Sistemas Informaticos",
  "Desarrollo de Software",
  "Procesos Informaticos",
  "Otros"
]

export const tpi = new Career('1', 'TPI', 'Tecnicatura Universitaria en Programacion Informatica',
  tpiSubjects.map(([shortName, fullName]) =>
    new Subject(shortName, fullName, areas[Math.floor(Math.random() * areas.length)]))
);

export const CAREERS: Career[] = [
  tpi,
];
