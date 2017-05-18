
namespace settings {

    export function onLeftHandedClick(e:HTMLInputElement) {
        events.leftHandedChange.publish({ isLeftHanded: e.checked });
    }

}