import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { useParams } from "react-router-dom";
import client from "../../../services/restClient";
import _ from "lodash";
import { Dialog } from "primereact/dialog";
import { Button } from "primereact/button";
import { Tag } from 'primereact/tag';
import moment from "moment";
import { InputText } from 'primereact/inputtext';
import { Dropdown } from 'primereact/dropdown';
import { Checkbox } from 'primereact/checkbox';


const getSchemaValidationErrorsStrings = (errorObj) => {
    let errMsg = {};
    for (const key in errorObj.errors) {
        if (Object.hasOwnProperty.call(errorObj.errors, key)) {
            const element = errorObj.errors[key];
            if (element?.message) {
                errMsg.push(element.message);
            }
        }
    }
    return errMsg.length ? errMsg : errorObj.message ? errorObj.message : null;
};

const CheckListFormsCreateDialogComponent = (props) => {
    const [_entity, set_entity] = useState({});
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);
    const urlParams = useParams();
    const [checklistId, setChecklistId] = useState([])

    useEffect(() => {
        set_entity(props.entity);
    }, [props.entity, props.show]);

     useEffect(() => {
                    //on mount checkLists
                    client
                        .service("checkLists")
                        .find({ query: { $limit: 10000, $sort: { createdAt: -1 }, _id : urlParams.singleCheckListsId } })
                        .then((res) => {
                            setChecklistId(res.data.map((e) => { return { name: e['name'], value: e._id }}));
                        })
                        .catch((error) => {
                            console.log({ error });
                            props.alert({ title: "CheckLists", type: "error", message: error.message || "Failed get checkLists" });
                        });
                }, []);

    const onSave = async () => {
        let _data = {
            checklistId: _entity?.checklistId?._id,
description: _entity?.description,
results: _entity?.results,
isValid: _entity?.isValid,
        };

        setLoading(true);
        try {
            
        await client.service("checkListForms").patch(_entity._id, _data);
        const eagerResult = await client
            .service("checkListForms")
            .find({ query: { $limit: 10000 ,  _id :  { $in :[_entity._id]}, $populate : [
                {
                    path : "checklistId",
                    service : "checkLists",
                    select:["name"]}
            ] }});
        props.onHide();
        props.alert({ type: "success", title: "Edit info", message: "Info checkListForms updated successfully" });
        props.onEditResult(eagerResult.data[0]);
        } catch (error) {
            console.log("error", error);
            setError(getSchemaValidationErrorsStrings(error) || "Failed to update info");
            props.alert({ type: "error", title: "Edit info", message: "Failed to update info" });
        }
        setLoading(false);
    };

    const renderFooter = () => (
        <div className="flex justify-content-end">
            <Button label="save" className="p-button-text no-focus-effect" onClick={onSave} loading={loading} />
            <Button label="close" className="p-button-text no-focus-effect p-button-secondary" onClick={props.onHide} />
        </div>
    );

    const setValByKey = (key, val) => {
        let new_entity = { ..._entity, [key]: val };
        set_entity(new_entity);
        setError({});
    };

    const checklistIdOptions = checklistId.map((elem) => ({ name: elem.name, value: elem.value }));

    return (
        <Dialog header="Edit CheckListForms" visible={props.show} closable={false} onHide={props.onHide} modal style={{ width: "40vw" }} className="min-w-max scalein animation-ease-in-out animation-duration-1000" footer={renderFooter()} resizable={false}>
            <div className="grid p-fluid overflow-y-auto"
            style={{ maxWidth: "55vw" }} role="checkListForms-edit-dialog-component">
                <div className="col-12 md:col-6 field">
            <span className="align-items-center">
                <label htmlFor="checklistId">ChecklistId:</label>
                <Dropdown id="checklistId" value={_entity?.checklistId?._id} optionLabel="name" optionValue="value" options={checklistIdOptions} onChange={(e) => setValByKey("checklistId", {_id : e.value})}  />
            </span>
            <small className="p-error">
            {!_.isEmpty(error["checklistId"]) && (
              <p className="m-0" key="error-checklistId">
                {error["checklistId"]}
              </p>
            )}
          </small>
            </div>
<div className="col-12 md:col-6 field">
            <span className="align-items-center">
                <label htmlFor="description">Description:</label>
                <InputText id="description" className="w-full mb-3 p-inputtext-sm" value={_entity?.description} onChange={(e) => setValByKey("description", e.target.value)}  required  />
            </span>
            <small className="p-error">
            {!_.isEmpty(error["description"]) && (
              <p className="m-0" key="error-description">
                {error["description"]}
              </p>
            )}
          </small>
            </div>
<div className="col-12 md:col-6 field">
            <span className="align-items-center">
                <label htmlFor="results">Results:</label>
                <InputText id="results" className="w-full mb-3 p-inputtext-sm" value={_entity?.results} onChange={(e) => setValByKey("results", e.target.value)}  required  />
            </span>
            <small className="p-error">
            {!_.isEmpty(error["results"]) && (
              <p className="m-0" key="error-results">
                {error["results"]}
              </p>
            )}
          </small>
            </div>
<div className="col-12 md:col-6 field flex">
            <span className="align-items-center">
                <label htmlFor="isValid">IsValid:</label>
                <Checkbox id="isValid" className="ml-3" checked={_entity?.isValid} onChange={ (e) => setValByKey("isValid", e.checked)}  />
            </span>
            <small className="p-error">
            {!_.isEmpty(error["isValid"]) && (
              <p className="m-0" key="error-isValid">
                {error["isValid"]}
              </p>
            )}
          </small>
            </div>
                <div className="col-12">&nbsp;</div>
                <small className="p-error">
                {Array.isArray(Object.keys(error))
                ? Object.keys(error).map((e, i) => (
                    <p className="m-0" key={i}>
                        {e}: {error[e]}
                    </p>
                    ))
                : error}
            </small>
            </div>
        </Dialog>
    );
};

const mapState = (state) => {
    const { user } = state.auth;
    return { user };
};
const mapDispatch = (dispatch) => ({
    alert: (data) => dispatch.toast.alert(data),
});

export default connect(mapState, mapDispatch)(CheckListFormsCreateDialogComponent);
