// Task mapper

function mapTask(task) {

  return {
    title: task.title,
    description: task.description,
    deadLine: task.deadLine,
    createdAt: task.createdAt,
    updatedAt: task.updatedAt,
    _id: task._id
  }

}

module.exports = mapTask;
