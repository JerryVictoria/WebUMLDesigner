<template>
    <div style="width: 100%; min-height: 30px; margin-bottom: 5px;">
        <img
            draggable="false"
            class="horizontal-middle avatarImg"
            style="float: left; margin-right: 15px;"
            src="../../assets/character.png"
        />
        <span
            style="display: inline-block; max-width: 100px; min-height: 20px; float: left"
        >{{text}}</span>
    </div>
</template>
<script>
export default {
    name: "OtherDialogBox",
    props: {
        text: String
    }
};
</script>