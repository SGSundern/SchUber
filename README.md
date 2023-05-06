# SchUber
Das Mitfahr-App-Projekt des SGS

Als Framework benutzen wir [MeteorJS](https://www.meteor.com).
Installiert wird das so:

Erstmal brauchen wir NodeJS und den Package Manager npm, Anleitung gibts hier: [NodeJS und NPM installieren](https://docs.npmjs.com/downloading-and-installing-node-js-and-npm)

Dann brauchen wir Meteor:

    npm install -g meteor


# Installation

Um dieses Repo zu installieren muss es zunächst geklont / kopiert werden.

Damit die App sich mit dem SQL Server verbinden kann, müssen wir wissen, unter welche Adresse
der SQL Server erreichbar ist. Außerdem benötigen wir den Benutzernamen und das Passwort. Dann ist es
noch nötig, den Namen der Datenbank anzugeben, die wir für die App benutzen wollen.

Da es sich z.B. beim Passwort um geschützte Daten handelt, die nicht in diesem öffentlichen Repo landen
sollten, machen wird das so:

Erstelle eine Kopie von `settings.json.example` unter dem Namen `settings.json`. Diese Datei wird nicht
auf github geteilt. Hier können dann die SQL-Zugangsdaten eingetragen werden.

Im Ordner kann nun per

    meteor npm install
    meteor run --settings settings.json

die App gestartet werden und ist dann unter `http://localhost:3000` erreichbar.

# Deploy

Im Netz bereitgestellt wird die App per *push-to-deploy*. Wenn im Fork (=der Kopie) [deploy](https://github.com/bratelefant/SchUber/tree/deploy) Änderungen (per Pull-Request / Push) vorgenommen werden, wird die App neu übersetzt und gestartet.