import React from "react";
import { render, screen } from "@testing-library/react";

import TimerServicesEditDialogComponent from "../TimerServicesEditDialogComponent";
import { MemoryRouter } from "react-router-dom";
import "@testing-library/jest-dom";
import { init } from "@rematch/core";
import { Provider } from "react-redux";
import * as models from "../../../models";

test("renders timerServices edit dialog", async () => {
    const store = init({ models });
    render(
        <Provider store={store}>
            <MemoryRouter>
                <TimerServicesEditDialogComponent show={true} />
            </MemoryRouter>
        </Provider>
    );
    expect(screen.getByRole("timerServices-edit-dialog-component")).toBeInTheDocument();
});
