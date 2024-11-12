import React from "react";
import { render, screen } from "@testing-library/react";

import TimerServicesCreateDialogComponent from "../TimerServicesCreateDialogComponent";
import { MemoryRouter } from "react-router-dom";
import "@testing-library/jest-dom";
import { init } from "@rematch/core";
import { Provider } from "react-redux";
import * as models from "../../../models";

test("renders timerServices create dialog", async () => {
    const store = init({ models });
    render(
        <Provider store={store}>
            <MemoryRouter>
                <TimerServicesCreateDialogComponent show={true} />
            </MemoryRouter>
        </Provider>
    );
    expect(screen.getByRole("timerServices-create-dialog-component")).toBeInTheDocument();
});
