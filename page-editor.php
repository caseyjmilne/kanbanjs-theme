<?php get_header(); ?>

<div class="editor">
    <h2 class="editor__title">Zero Editor</h2>
    <div class="editor__content">
        <div class="toolbox">
            <h2>Toolbox</h2>
        </div>
        <div class="canvas">
            <h2>Canvas</h2>
        </div>
        <div class="settings">
            <h2>Settings</h2>
        </div>
    </div>
</div>

<?php the_content(); ?>
<?php get_footer(); ?>

<style>
    
.editor {
    background: rgb(40,40,40);
    color: rgb(200,200,200);
    padding: 2px;
}

.editor__content {
    display: flex;
    gap: 2px;
}

.editor__title {
    font-size: 12px;
    font-weight: 900;
}

.canvas {
    width: 80%;
    min-height: 500px;
    background: rgb( 50,50,50);
}

.text-block {
    border: 1px solid #ccc;
    background: #111;
    color: white;
    padding: 0.5rem;
    margin-bottom: 1rem;
}

.toolbox-items {
  display: flex;
  flex-direction: column;
  gap: 6px;
  margin-top: 1rem;
}

.toolbox-item {
  background: #333;
  border: 1px solid #666;
  padding: 0.5rem;
  color: white;
  font-size: 12px;
  cursor: grab;
  user-select: none;
}

.toolbox-item.dragging {
  opacity: 0.5;
}

.canvas--dragover {
  outline: 2px dashed #aaa;
}

.canvas-block {
  border: 1px solid #555;
  background: #222;
  padding: 1rem;
  margin-bottom: 1rem;
  color: white;
}

.canvas-block img {
  max-width: 100%;
}

.canvas-button {
  background: #0084ff;
  border: none;
  padding: 0.5rem 1rem;
  color: white;
  font-size: 14px;
  cursor: pointer;
}

.canvas-block.selected {
  outline: 2px solid #00aaff;
}

</style>
