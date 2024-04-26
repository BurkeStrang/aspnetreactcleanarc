import React, { Component } from "react";
import followIfLoginRedirect from "./api-authorization/followIfLoginRedirect";
import { WeatherForecastsClient } from "../web-api-client.ts";
import {
  TodoItemsClient,
  TodoListsClient,
  TodosVm,
  CreateTodoListCommand,
  CreateTodoItemCommand,
} from "../web-api-client.ts";
import { ScaleLoader } from "react-spinners";
import "./FetchData.css";
import { Collapse, CardBody, Card } from "reactstrap";
import { BsCaretDown, BsCaretUp, BsPlusCircle } from "react-icons/bs";

export class FetchData extends Component {
  static displayName = FetchData.name;

  constructor(props) {
    super(props);
    this.state = {
      todoLists: {},
      loading: true,
      listItemOpen: {},
      addItem: {},
    };
  }

  componentDidMount() {
    this.populateTodoItems();
  }

  static renderForecastsTable(
    todoLists,
    listItemOpen,
    toggleListItem,
    addItem,
  ) {
    return (
      <table className="table table-striped" aria-labelledby="tableLabel">
        <thead>
          <tr>
            <th>Title</th>
            <th>Colour</th>
            <th>Items</th>
          </tr>
        </thead>
        <tbody>
          {todoLists.lists.map((list, index) => (
            <React.Fragment key={index}>
              <tr>
                <td>{list.title}</td>
                <td>{list.colour}</td>
                <td>
                  <div
                    onClick={() => toggleListItem(index)}
                    style={{ cursor: "pointer" }}
                  >
                    <>{listItemOpen[index] ? <BsCaretDown /> : <BsCaretUp />}</>
                  </div>
                </td>
              </tr>
              <tr className="todoLists">
                <td className="todoLists" colSpan="3">
                  <Collapse isOpen={listItemOpen[index]}>
                    <Card>
                      <CardBody>
                        <table
                          className="table table-striped"
                          aria-labelledby="tableLabel"
                        >
                          <thead>
                            <tr>
                              <th>Title</th>
                              <th>Done</th>
                              <th>Priority</th>
                              <th>Note</th>
                              <th>
                                <div
                                  onClick={() => addItem()}
                                  style={{ cursor: "pointer" }}
                                >
                                  <BsPlusCircle></BsPlusCircle>
                                </div>
                              </th>
                            </tr>
                          </thead>
                          <tbody>
                            {list.items.map((item, index) => (
                              <tr key={index}>
                                <td>{item.title}</td>
                                <td>
                                  <div className="form-check">
                                    <input
                                      className="form-check-input"
                                      type="checkbox"
                                      value={item.done}
                                      id={index}
                                    ></input>
                                  </div>
                                </td>
                                <td>{item.priority}</td>
                                <td>{item.note}</td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </CardBody>
                    </Card>
                  </Collapse>
                </td>
              </tr>
            </React.Fragment>
          ))}
        </tbody>
      </table>
    );
  }

  render() {
    let contents = this.state.loading ? (
      <div className="loading">
        <ScaleLoader className="spinner" size={48} color="aquamarine" />
      </div>
    ) : (
      FetchData.renderForecastsTable(
        this.state.todoLists,
        this.state.listItemOpen,
        this.toggleListItem.bind(this),
        this.addItem.bind(this),
      )
    );

    return (
      <div>
        <h1 id="tableLabel">Todo List</h1>
        <div style={{ textAlign: "right" }}>
          <button
            onClick={() => this.createTodoList()}
            className="btn btn-primary"
          >
            New List
          </button>
        </div>
        {contents}
      </div>
    );
  }

  async populateTodoItems() {
    let client = new TodoListsClient();
    const data = await client.getTodoLists();
    this.setState({ todoLists: data, loading: false });
  }

  async toggleListItem(index) {
    this.setState((prevState) => ({
      listItemOpen: {
        ...prevState.listItemOpen,
        [index]: !prevState.listItemOpen[index],
      },
    }));
  }

  async addItem() {
    let client = new TodoItemsClient();
    let command = new CreateTodoItemCommand({
      listId: 1,
      title: "Next Todo Item",
    });
    const data = await client.createTodoItem(command);
  }

  async createTodoList() {
    let client = new TodoListsClient();
    let command = new CreateTodoListCommand({ title: "Next Todo List" });
    const data = await client.createTodoList(command);
  }

  // async populateWeatherData() {
  //   let client = new WeatherForecastsClient();
  //   const data = await client.getWeatherForecasts();
  //   this.setState({ forecasts: data, loading: false });
  // }
  //
  // async populateWeatherDataOld() {
  //   const response = await fetch("weatherforecast");
  //   followIfLoginRedirect(response);
  //   const data = await response.json();
  //   this.setState({ forecasts: data, loading: false });
  // }
}
