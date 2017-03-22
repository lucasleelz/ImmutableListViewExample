/**
 * Created by lucas on 2017/3/22.
 */
'use strict';
import React, {Component, PropTypes} from "react";
import {
    StyleSheet,
    View,
    Text,
    TouchableOpacity,
    Alert
} from "react-native";

// import ImmutableListView from 'react-native-immutable-list-view';
import ImmutableListView from './ImmutableListView';

import Immutable, {List} from 'immutable';

class Section {

    name: string;

    description: string;

    level: number;

    isOpen: boolean;

    constructor(name: string, description: string) {
        this.level = 0;
        this.isOpen = false;
        this.name = name;
        this.description = description;
    }
}

class Row {
    name: string;

    description: string;

    level: number;

    isOpen: boolean;

    constructor(name: string, description: string) {
        this.level = 1;
        this.isOpen = false;
        this.name = name;
        this.description = description;
    }
}

export default class ListViewExample extends Component {

    static propTypes = {
        initialName: PropTypes.string,
    };

    static defaultProps = {
        initialName: 'default name',
        initialRows: List.of(
            new Row('ROW A', 'test data.'),
            new Row('ROW B', 'test data.'),
            new Row('ROW C', 'test data.'),
            new Row('ROW D', 'test data.'),
        ),
    };

    state = {
        name: this.props.initialName,
        listData: List.of(new Section('Section A', 'test data.'))
    };

    render() {
        return (
            <ImmutableListView
                style={{marginTop: 20, backgroundColor: '#F1F1F4'}}
                immutableData={this.state.listData}
                renderRow={this.renderRow}
                renderSeparator={this.renderSeparator}
                rowHasChanged={this.rowHasChange}
            />
        )
    }

    rowHasChange = (prevRowData, nextRowData) => {
        return true;
        // return !Immutable.is(prevRowData, nextRowData);
    };

    renderRow = (rowData, sectionID, rowID) => {
        console.log('rowData =>', rowData);
        if (rowData === undefined || rowData === null) {
            return null;
        }
        if (rowData.level === 0) {
            return (
                <TouchableOpacity onPress={this._pressSectionRow.bind(this, rowData, rowID)}>
                    <View style={styles.sectionContainer}>
                        <Text style={styles.sectionTitle}>{rowData.name}</Text>
                        <Text style={styles.sectionDescription}>{rowData.description}</Text>
                    </View>
                </TouchableOpacity>
            )
        }
        return (
            <TouchableOpacity onPress={this._pressRow.bind(this, rowData, rowID)}>
                <View style={styles.rowContainer}>
                    <Text style={styles.rowTitle}>{rowData.name}</Text>
                    <Text style={styles.rowDescription}>{rowData.description}</Text>
                </View>
            </TouchableOpacity>
        )
    };

    renderSeparator = (sectionID, rowID) => {
        return (
            <View key={`${sectionID}-${rowID}`} style={{backgroundColor: '#F1F1F4', height:1}}/>
        );
    };

    _pressSectionRow = (rowData, rowID) => {
        if (rowData.isOpen && rowData.level === 0) {

            let listData = this.state.listData
                .asMutable()
                .filter((obj) => obj instanceof Section && obj.level === 0);

            rowData.isOpen = !rowData.isOpen;
            rowData.description = 'test data.';
            listData.set(rowID, rowData);

            this.setState({
                listData: listData,
            });

        } else {
            this.fetchSectionRowsData(rowData, rowID);
        }
    };

    _pressRow = (rowData, rowID) => {
        Alert.alert(rowData.name);
    };

    fetchSectionRowsData = (rowData, rowID) => {

        let listData = this.state.listData.asMutable();

        this.props.initialRows.forEach((row, index) => {
            listData.set(rowID + index + 1, row);
        });
        rowData.isOpen = !rowData.isOpen;
        rowData.description = 'update test data.';
        listData.set(rowID, rowData);

        this.setState({
            listData: listData,
        });
    };
}

const styles = StyleSheet.create({
    sectionContainer: {
        backgroundColor: 'white',
        borderTopWidth: 5,
        borderTopColor: '#F1F1F4',
        borderBottomWidth: 1,
        borderBottomColor: '#F1F1F4',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-around',
    },
    sectionTitle: {
        marginVertical: 16,
        marginLeft: 16,
    },
    sectionDescription: {
        fontSize: 16,
        color: 'gray'
    },
    rowContainer: {
        backgroundColor: 'white',
    },
    rowTitle: {
        margin: 20,
    },
    rowDescription: {
        marginLeft: 20,
        marginBottom: 16,
        fontSize: 12,
        color: 'gray',
    },
});
