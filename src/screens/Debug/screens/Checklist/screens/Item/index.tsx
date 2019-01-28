import * as React from "react";
import { FlatList, View } from "react-native";
import { connect } from "react-redux";
import { RouteComponentProps } from "react-router";
import { Button, Screen } from "../../../../../../components";
import { RootState } from "../../../../../../models";
import { Theme } from "../../../../../../utils";
import {
  createItem,
  ItemsArray,
  removeItem,
  selectItemsByCreatedAt,
  toggleActiveItem,
  updateItem
} from "../../models/Item";

interface StateProps {
  items: ItemsArray;
}

interface DispatchProps {
  createItem: typeof createItem;
  updateItem: typeof updateItem;
  removeItem: typeof removeItem;
  toggleActiveItem: typeof toggleActiveItem;
}

type Props = RouteComponentProps & StateProps & DispatchProps;

class Component extends React.PureComponent<Props> {
  public render() {
    const {
      history,
      items,
      removeItem: remove,
      toggleActiveItem: toggle
    } = this.props;

    return (
      <Screen disableScroll onLeftPress={() => history.goBack()}>
        <FlatList
          keyExtractor={item => item.id}
          data={items}
          renderItem={({ item }) => (
            <View style={{ flexDirection: "row" }}>
              <Button
                label
                icon="checkbox-marked-circle"
                iconColor={Theme.color.success}
                onPress={() => undefined}
              />
              <Button
                label
                icon="close-circle"
                iconColor={Theme.color.danger}
                onPress={() => remove(item.id)}
              />
              <Button
                label
                iconColor={Theme.color.warning}
                icon="clock"
                onPress={() => toggle(item.id)}
              />
              <Button
                label
                neutral={item.active}
                lowercase
                title={item.id}
                onPress={() => undefined}
              />
            </View>
          )}
        />
        <Button fab contained icon="plus" onPress={this.createItem} />
      </Screen>
    );
  }
  private createItem = () => {
    const { createItem: create } = this.props;
    create({ name: Date.now().toString(), description: "hello" });
  };
}

export const Item = connect(
  (state: RootState) => ({
    items: selectItemsByCreatedAt(state)
  }),
  {
    updateItem,
    createItem,
    removeItem,
    toggleActiveItem
  }
)(Component);