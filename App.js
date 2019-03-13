/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, { Component } from 'react';
import {
    StyleSheet,
    Text,
    View
} from 'react-native';

const Realm = require('realm');

const HausbesitzerSchema = {
    name: 'Hausbesitzer',
    properties: {
        name: 'string',
        prename: 'string',
        street: 'string',
        plz: 'int',
        city: 'string',
        antraege: 'Antrag[]'
    }
};

const AntragSchema = {
    name: 'Antrag',
    properties: {
        id: 'int',
        name: 'string',
        status: 'int'
    }
};

type Props = {};
export default class App extends Component<Props> {

    constructor() {
        super();

        this.state = {
            realm: null
        }
    }

    createPerson(person) {

        Realm.open({
            path: 'CaseStudy.realm',
            schema: [HausbesitzerSchema]
        })
            .then( realm => {

                realm.write( () => {

                    realm.create('Hausbesitzer', {

                        name: person.name,
                        prename: person.prename,
                        street: person.street,
                        plz: person.plz,
                        city: person.city

                    })

                })

                this.setState({
                    realm
                })

            })

    }

    createAntrag(antrag) {

        Realm.open({
            path: 'CaseStudy.realm',
            schema: [AntragSchema]
        })
            .then( realm => {

                realm.write( () => {

                    realm.create('Antrag', {

                        id: antrag.id,
                        name: antrag.name,
                        status: 0

                    })

                })

            })

    }

    componentWillMount() {

        Realm.open({
            path: 'CaseStudy.realm',
            schema: [HausbesitzerSchema, AntragSchema]
        })
            .then( realm => {

                this.setState({
                    realm
                });

        })

    }

    render() {

        if(this.state.realm) {
            //console.log(this.state.realm.path)
            let Hausbesitzer = this.state.realm.objects('Hausbesitzer');

            let persons = [];
            for(let person of Hausbesitzer) {
                persons.push(
                    <View>
                        <Text>{person.prename + " " + person.name}</Text>
                    </View>
                )
            }

            let Antraege = this.state.realm.objects('Antrag');

            let ant = [];
            for(let a of Antraege) {
                ant.push(
                    <View>
                        <Text>{a.id + " " + a.name + " " + a.status}</Text>
                    </View>
                )
            }

            return(
                <View style={{marginTop: 48}}>
                    {persons}
                    {ant}
                </View>
            )

        }

        return <View />;

    }

}


