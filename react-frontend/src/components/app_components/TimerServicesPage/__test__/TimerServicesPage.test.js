import React from "react";
import { render, screen } from "@testing-library/react";

import TimerServicesPage from "../TimerServicesPage";
import { MemoryRouter } from "react-router-dom";
import "@testing-library/jest-dom";
import { init } from "@rematch/core";
import { Provider } from "react-redux";
import * as models from "../../../models";

test("renders timerServices page", async () => {
    const store = init({ models });
    render(
        <Provider store={store}>
            <MemoryRouter>
                <TimerServicesPage />
            </MemoryRouter>
        </Provider>
    );
    expect(screen.getByRole("timerServices-datatable")).toBeInTheDocument();
    expect(screen.getByRole("timerServices-add-button")).toBeInTheDocument();
});
